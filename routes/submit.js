const router = require('express').Router()
const supabase = require('../utils/supabaseClient')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
import { request } from 'urllib';

router.post('/', async (req, res) => {

    const course_id = req.body.course_id
    const student_id= req.body.student_id
    const qs=req.body.qs
    const comptency_size = 6

    console.log(course_id,student_id,qs)

    const map_level={"Easy":0.5,"Medium":1,"Difficult":2}
    var comptencies = new Array(comptency_size).fill(0)
    var count = new Array(comptency_size).fill(0)

    var {data}=await supabase
    .from('state')
    .select('next_state')
    .eq('student_id',student_id)

    current_state=data[0]['next_state']
    console.log(current_state)

    qs.forEach(element => {
        if(element['correct']){
            for (const s in element['skills']) {
                comptencies[s]+=map_level[element['difficulty']]
                count[s]+=1
            }
        }
    });


    for(let i=0;i<comptencies.length;i++){
        if(count[i]>0){
            comptencies[i]=comptencies[i]/count[i];
        }
    }


    var {error} = await supabase
    .from('state')
    .update({'next_state':comptencies,'current_state':current_state})
    .eq('student_id',student_id)


    console.log(error)

    var {error} = await supabase
    .from('user_enrollment')
    .update({'skill_state':comptencies})
    .eq('user_id',student_id)
    .eq('course_id',course_id)

    console.log(error)


const url = 'http://localhost:5000/recommend'; 
var { data, res } = await request(url);
// result: { data: Buffer, res: Response }
console.log('status: %s, body size: %d, headers: %j', res.status, data.length, res.headers);

// fetch(url)
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Request failed with status: ' + response.status);
//     }
//   })
//   .then(data => {
//     console.log(data); // Handle the response from the Flask API
//   })
//   .catch(error => {
//     console.error(error); // Handle any error that occurred during the request
//   });

res.status(200).send()

})

module.exports = router