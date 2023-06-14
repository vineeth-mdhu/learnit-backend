const router = require('express').Router()
const supabase = require('../utils/supabaseClient')

router.get('/', async (req, res) => {
    stduent_id=req.stduent_id
    content= await fetch('url/recommend')
    res.statusCode(200).send(content)
})

module.exports = router