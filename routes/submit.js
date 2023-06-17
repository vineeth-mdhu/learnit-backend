const router = require('express').Router()
const supabase = require('../utils/supabaseClient')

router.post('/', async (req, res) => {

    const course_id = req.body.course_id
    const student_id= req.body.student_id
    const qs=req.body.qs
    const comptency_size = 6
    console.log(req)
    console.log(course_id,student_id,qs)

    const map_level={"Easy":0.5,"Medium":1,"Hard":2}
    var comptencies = new Array(comptency_size).fill(0)
    var count = new Array(comptency_size).fill(0)

    var {data}=await supabase
    .from('state')
    .select('next_state')
    .eq('student_id',student_id)

    current_state=data[0]['next_state']
    console.log(current_state)

    qs.forEach(element => {
        // console.log(element['correct'])
        if(element['correct']){
            console.log(element['skills'])
            for (var s in element['skills']) {
                s=parseInt(s)
                // console.log(s)
                comptencies[s]+=map_level[element['difficulty']]
                // console.log(map_level[element['difficulty']])
                console.log(comptencies)
                count[s]+=1
                
            }
            
        }
    });

    console.log(comptencies)

    for(let i=0;i<comptencies.length;i++){
        if(count[i]>0){
            comptencies[i]=comptencies[i]/count[i];
        }
    }


    var {error} = await supabase
    .from('state')
    .update({'next_state':comptencies,'current_state':current_state})
    .eq('student_id',student_id)
    .eq('course_id',course_id)


    console.log(error)

    var {error} = await supabase
    .from('user_enrollment')
    .update({'skill_state':comptencies})
    .eq('user_id',student_id)
    .eq('course_id',course_id)

    console.log(error)

    res.status(200).send()

})

module.exports = router