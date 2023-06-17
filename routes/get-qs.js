const router = require('express').Router()
const { response } = require('express')
const supabase = require('../utils/supabaseClient')

router.post('/', async (req, res) => {
    const course_id=req.body.course_id
    console.log(req)
    const {data}=await supabase
    .from('courses')
    .select('question_bank')
    .eq('course_id',course_id)
    console.log(data)
    var size = 20
    var response= []
    var items= new Set()
    while(size>0){
        index=Math.floor(Math.random() * size);
        if(!items.has(index)){
        response.push(data[0].question_bank[index])
        items.add(index)
        size-=1
        }
    }
    console.log(response)
    res.status(200).send(response)
    
})

module.exports = router