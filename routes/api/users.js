import express from 'express';
const router = express.Router();

// @route  GET /api/users/test
// @desc   Test user route
// @route  private
router.get('/test',(req,res)=>{
    res.json({msg:"users"});
})

module.exports = router;