import express from 'express';
const router = express.Router();

// @route  GET /api/posts/test
// @desc   Test posts route
// @route  public
router.get('/test',(req,res)=>{
    res.json({msg:"posts"});
})

module.exports = router;