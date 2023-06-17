const router = require('express').Router()
const { response } = require('express')
const supabase = require('../utils/supabaseClient')

router.post('/', async (req, res) => {

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      
    const course_id=req.body.course_id
    console.log(req)
    const {data}=await supabase
    .from('courses')
    .select('question_bank')
    .eq('course_id',course_id)
    console.log(data)
    var size = 19
    var response= []
    var items= new Set()

    shuffle(data[0].question_bank)
    while(size>=0){
        response.push(data[0].question_bank[size])
        size-=1
    }

    console.log(response)
    res.status(200).send(response)
    
})

module.exports = router