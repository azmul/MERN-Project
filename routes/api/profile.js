import express from 'express';
const router = express.Router();

// @route  GET /api/profile/test
// @desc   Test profile route
// @route  public
router.get('/test',(req,res)=>{
    res.json({msg:"profile"});
})

module.exports = router;