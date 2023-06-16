const router = require('express').Router()
const supabase = require('../utils/supabaseClient')

router.get('/', async (req, res) => {
    stduent_id=req.id
    
    state=supabase
    .from('state')
    .eq('id',stduent_id)
    
    content= await fetch('url/recommend',{
        body: state['data'][0]
    })
    res.statusCode(200).send(content)
})

module.exports = router