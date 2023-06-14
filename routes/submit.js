const router = require('express').Router()
const supabase = require('../utils/supabaseClient')

router.post('/', async (req, res) => {

    const module_id = req.body.module
    const ans = req.body.ans
    
    const comptency_list = await supabase
        .from('comptencies')
        .eq('id', module_id)

    var comptencies = {}
   
    for (skill in comptency_list){
        comptencies[skill]={}
        for(q in ans){
            comptencies[skill][q]=0
        }
    }

    for (q_id in ans) {
        correct = supabase
            .from('questions')
            .select('ans', 'comptencies')
            .eq('id', q_id)

        for (comptency in correct.comptencies) {
            if (ans[q_id] == correct.ans) {
                comptencies[comptency][q_id] = 1
            }
        }
    }

    const update= await supabase
    .from('state')
    .upsert(comptencies)
    .eq('student_id',student_id)
})

module.exports = router