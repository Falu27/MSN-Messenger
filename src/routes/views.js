import { Router } from 'express';

const router = Router();

router.get('/', (req, res)=>{
    res.render('chat', {css:'chat'});
})

export default router