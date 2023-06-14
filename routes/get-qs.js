const router = require('express').Router()
const { response } = require('express')
const supabase = require('../utils/supabaseClient')

router.get('/', async (req, res) => {
    module_id=req.module_id
    questions=await supabase
    .from('questions')
    .eq('module_id',module_id)

    var size = questions.size()

    while(size>0){
        index=Math.floor(Math.random() * questions.size());
        response.append(questions[index])
    }

    res.statusCode(200).send(response)
    
})

module.exports = router