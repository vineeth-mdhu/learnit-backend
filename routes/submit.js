const router = require('express').Router()
const supabase = require('../utils/supabaseClient')

router.post('/', async (req, res) => {

    const module_id = req.body.module
    const qs = req.body.qs
    
    const comptency_size = await supabase
        .from('modules')
        .eq('id', module_id)
        .select('comptency_size')

    var comptencies = new Array(comptency_size).fill(0)
    var count = new Array(comptency_size).fill(0)
   
    for (q_id in qs) {
        correct = supabase
            .from('questions')
            .select('ans', 'comptencies')
            .eq('id', q_id)

        for (comptency in correct.data.comptencies) {
            if (ans[q_id] == correct.ans) {
                comptencies[comptency]+=1
                count[comptency]+=1
            }
        }
    }

    for(let i=0;i<comptencies.length;i++){
        comptencies[i]/count[i];
    }

    const update= await supabase
    .from('state')
    .upsert(comptencies)
    .eq('student_id',student_id)
})

module.exports = router