const express = require('express');
require('dotenv').config();
const router = express.Router();
const Orders = require('../models/Orders');
const jwt = require('jsonwebtoken');
const session = require('express-session');
let LocalStorage = require('node-localstorage').LocalStorage;
let dir = __dirname.replace('routes','');
localStorage = new LocalStorage('./scratch');

router.get('/',async(req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){throw err}
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'/views/order.ejs',{records:docs,errorsOrder:errorsOrder});
})

// Delete order Route
router.post('/DeleteOrder',async(req,res)=>{
    try{
        const DeletedOrder = await Orders.deleteOne({orderNo:req.body.currentOrderNo});
        console.log("Order Deleted Successfully");
    }
    catch (err) {
        res.redirect('/login');
    };
    console.log(req.body.page);
    if(req.body.page === "order")
        res.redirect('/');
    else
        res.redirect('/Admin');
})

router.get('/Shops',async(req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,time:1,orderNo: 1, type: 1,currentDepartment:1,clientName:1,Notes:1,redirectionType:1,graphNo:1,requiredColor:1});
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){throw err}
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'/views/Shops.ejs',{records:docs});
})

//Authenticate
const auth = (req,res,next) => {
    if (!req.session.user)
        res.redirect('login');
    else {
        if (req.session.user.email === "admin@gmail.com")
            next();
        else
            res.sendStatus(403);
    }
}
const authDep1 = (req,res,next) =>{
    if (!req.session.user)
        res.redirect('login');
    else {
        if (req.session.user.email === "dep1@gmail.com")
            next();
        else
            res.sendStatus(403);
    }
}

const authDep2 = (req,res,next) =>{
    if (!req.session.user)
        res.redirect('login');
    else {
        if (req.session.user.email === "dep2@gmail.com")
            next();
        else
            res.sendStatus(403);
    }
}

const authDep3 = (req,res,next) =>{
    if (!req.session.user)
        res.redirect('login');
    else {
        if (req.session.user.email === "dep3@gmail.com")
            next();
        else
            res.sendStatus(403);
    }
}

// Order Routes
let errorsOrder = []
let errors = [];
router.post('/addOrder',async (req,res)=>{
    errorsOrder = []
    const {orderNo,orderType,orderDep,flexRadioDefault,clientName,Notes, graphNo , requiredColor, Dep2Type} = req.body;
    console.log(orderDep+" "+flexRadioDefault + "  " + Dep2Type);
    if(orderDep==="??????-??????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:orderDep,
                Dep1: true,
                visitedDeps: orderDep,
                Dep1EntryTime: new Date().toLocaleString(),
                DepNo: 1,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);
        }
    }
    else if(orderDep==="??????-??????????-??????????" || orderDep==="??????-??????????-??????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:'??????-??????????',
                Dep2: true,
                visitedDeps: '??????-??????????',
                Dep2EntryTime: new Date().toLocaleString(),
                DepNo: 2,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);        }
    }
    else if(orderDep==="??????-??????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:orderDep,
                Dep3: true,
                visitedDeps: orderDep,
                Dep3EntryTime: new Date().toLocaleString(),
                DepNo: 3,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);
        }
    }
    else if(orderDep==="??????-??????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:orderDep,
                Dep4: true,
                visitedDeps: orderDep,
                Dep4EntryTime: new Date().toLocaleString(),
                DepNo: 4,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);
        }
    }
    else if(orderDep==="??????-??????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:orderDep,
                Dep5: true,
                visitedDeps: orderDep,
                Dep5EntryTime: new Date().toLocaleString(),
                DepNo: 5,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);
        }
    }
    else if(orderDep==="??????-??????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:orderDep,
                Dep6: true,
                visitedDeps: orderDep,
                Dep6EntryTime: new Date().toLocaleString(),
                DepNo: 6,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);
        }
    }
    else if(orderDep==="??????-??????????????-??????-??????????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:orderDep,
                Dep7: true,
                visitedDeps: orderDep,
                Dep7EntryTime: new Date().toLocaleString(),
                DepNo: 7,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);
        }
    }
    else if(orderDep==="??????-??????????????-??????-??????????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:orderDep,
                Dep8: true,
                visitedDeps: orderDep,
                Dep8EntryTime: new Date().toLocaleString(),
                DepNo: 8,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);
        }
    }
    else if(orderDep==="??????-??????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:orderDep,
                Dep9: true,
                visitedDeps: orderDep,
                Dep9EntryTime: new Date().toLocaleString(),
                DepNo: 9,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);
        }
    }
    else if(orderDep==="??????-????????-??????????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:orderDep,
                Dep10: true,
                visitedDeps: orderDep,
                Dep10EntryTime: new Date().toLocaleString(),
                DepNo: 10,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);
        }
    }
    else if(orderDep==="??????-????????-????????????????") {
        try {
            const newOrder = await new Orders({
                orderNo,
                type: orderType,
                time: new Date().toLocaleString(),
                currentDepartment:orderDep,
                Dep10: true,
                visitedDeps: orderDep,
                Dep11EntryTime: new Date().toLocaleString(),
                DepNo: 11,
                redirectionType:flexRadioDefault,
                clientName,
                Notes,
                graphNo,
                requiredColor,
                Dep2Type

            })
            newOrder.save();
        } catch (err) {
            errorsOrder.push("???? ?????? ?????????? ?????????????? ?????????? ???????? ???????? ???????????????? ???? ???????????? ????????????")
            res.render('Login',errorsOrder);
        }
    }
    console.log("new order saved");
    res.redirect('/');
})

//Login Route
router.get('/login',(req,res)=>{
    res.render(dir+'views/Login.ejs',{error:errors});
});

router.post('/login',(req,res)=>{
    errors = [];
    Orders.findOne({email:req.body.email}).then(user=>{
        if(!user){
            errors.push('Wrong Email & Password Combination');
            res.render('Login',{error:errors});
        }
        else{
            if(user.password !== req.body.password){
                errors.push('Wrong Email & Password Combination');
                res.render('Login',{error:errors});
            }
            else {
                let token
                if (user.email === "admin@gmail.com") {
                    req.session.user = user;
                    req.session.save();
                    res.redirect('/Admin');
                }
                else if (user.email === "dep1@gmail.com") {
                    req.session.user = user;
                    req.session.save();
                    res.redirect('/Dep1');
                }
                else if (user.email === "dep2@gmail.com") {
                    req.session.user = user;
                    req.session.save();
                    res.redirect('/Dep2');
                }
                else if (user.email === "dep3@gmail.com") {
                    req.session.user = user;
                    req.session.save();
                    res.redirect('/Dep3');
                }
            }
        }
    })
});

//Logout route
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.render(dir+'views/Login.ejs',{error:errors});
})

//Departments routes

// Dep1 = ?????? ??????????
router.get('/Dep1', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{
            _id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    console.log(docs);
   // console.log(docs[0].graphNo);
    res.render(dir+'views/Dep1.ejs',{records:docs});
})

//Dep2 = ?????? ??????????

router.get('/Dep2', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{
            _id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    //console.log(docsArr2);
    res.render(dir+'views/Dep2.ejs',{records:docs});
})

//Dep3 = ?????? ??????????

router.get('/Dep3', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{
            _id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'views/Dep3.ejs',{records:docs});
})

// Dep4  = ??????????

router.get('/Dep4', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'views/Dep4.ejs',{records:docs});
})


// Dep5  = ??????????

router.get('/Dep5', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'views/Dep5.ejs',{records:docs});
})


// Dep6  = ??????????

router.get('/Dep6', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'views/Dep6.ejs',{records:docs});
})


// Dep7  = ???????????????? ?????? ??????????????

router.get('/Dep7', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'views/Dep7.ejs',{records:docs});
})


// Dep8  = ???????????????? ?????? ??????????????

router.get('/Dep8',async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    console.log(docs);
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'views/Dep8.ejs',{records:docs});
})

// Dep9  = ??????????

router.get('/Dep9', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'views/Dep9.ejs',{records:docs});
})

// Dep10  = ???????? ????????????????

router.get('/Dep10', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'views/Dep10.ejs',{records:docs});
})

// Dep11  = ???????? ????????????????

router.get('/Dep11', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            Notes:1,
            redirectionType:1,
            graphNo:1,
            requiredColor:1,
            Dep2Type:1
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=''){
                docsArr2.push(re);
            }
        })
    })
    res.render(dir+'views/Dep11.ejs',{records:docs});
})


router.get('/Admin', async (req,res)=>{
    let docs;
    let docsArr = [];
    try {
        docs = await Orders.find({email:false},{_id:0,
            time:1,
            orderNo: 1,
            type: 1,
            currentDepartment:1,
            clientName:1,
            redirectionType:1,
            Notes:1,
            visitedDeps:1,
            Dep1EntryTime:1,
            Dep1ExitTime:1,
            Dep2EntryTime:1,
            Dep2ExitTime:1,
            Dep3EntryTime:1,
            Dep3ExitTime:1,
            Dep4EntryTime:1,
            Dep4ExitTime:1,
            Dep5EntryTime:1,
            Dep5ExitTime:1,
            Dep6EntryTime:1,
            Dep6ExitTime:1,
            Dep7EntryTime:1,
            Dep7ExitTime:1,
            Dep8EntryTime:1,
            Dep8ExitTime:1,
            Dep9EntryTime:1,
            Dep9ExitTime:1,
            Dep10EntryTime:1,
            Dep10ExitTime:1,
            Dep11EntryTime:1,
            Dep11ExitTime:1,
            DepNo:1,
            graphNo:1,
            requiredColor:1
        });
        //console.log(docs);
        docs.forEach(doc=>{
            //console.log(doc);
            let docHolder = doc.toString().replace(/[{',}]/g,'  ');
            docsArr.push(docHolder.split(' '));
        })
    }
    catch (err){
        errorsOrder.push("???? ?????? ?????????? ??????????, ???????? ???????? ???????????????? ???? ???????????? ????????????")
        res.render('Login',errorsOrder);
    }
    let docsArr2 = [];
    let isDep=0;
    let isVis=0;
    let depTimes = [];
    let visitedDeps = [];
   //console.log(docs[1]);
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=='' && re!==/\n/g && re!=='false'){
                docsArr2.push(re);
                //console.log(re);
                if(re==='Dep1EntryTime:') {
                    isDep = 1;
                    isVis = 0;
                }
                if(isVis)
                    visitedDeps.push(re);
                if(re==='visitedDeps:')
                    isVis=1;
                if(isDep)
                    depTimes.push(re);
                if(re==="DepNo")
                    isDep=0;
            }
        })
    })
    let deps =[];
        //visitedDeps[0].split('-');
    //console.log(depTimes);
   // console.log(deps);
    res.render('Admin',{records:docs,times:depTimes,deps:deps});
})

router.post('/DepartmentRedirection',async (req,res)=>{
    // To get the visitedDeps value;
    console.log("i am here");
    const {orderDep,currentDep} = req.body;
    let docs;
    let docsArr = [];
    let DepNo = [];
    // to get total number of visited deps
    try {
        docs = await Orders.find({'orderNo': req.body.currentOrderNo},{
            __v:0,
            _id:0,
            time:0,
            orderNo: 0,
            type: 0,
            currentDepartment:0,
            Dep1:0,
            Dep2:0,
            Dep3:0,
            Dep4:0,
            Dep5:0,
            Dep6:0,
            Dep7:0,
            Dep8:0,
            Dep9:0,
            Dep10:0,
            Dep11:0,
            email:0,
            password:0,
            Dep1EntryTime:0,
            Dep1ExitTime:0,
            Dep2EntryTime:0,
            Dep2ExitTime:0,
            Dep3EntryTime:0,
            Dep3ExitTime:0,
            Dep4EntryTime:0,
            Dep4ExitTime:0,
            Dep5EntryTime:0,
            Dep5ExitTime:0,
            Dep6EntryTime:0,
            Dep6ExitTime:0,
            Dep7EntryTime:0,
            Dep7ExitTime:0,
            Dep8EntryTime:0,
            Dep8ExitTime:0,
            Dep9EntryTime:0,
            Dep9ExitTime:0,
            Dep10EntryTime:0,
            Dep10ExitTime:0,
            Dep11EntryTime:0,
            Dep11ExitTime:0,
            visitedDeps:0,
            graphNo:0,
            requiredColor:0
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{'}]/g,'  ');
            DepNo.push(docHolder.split(':'));
        })
    }
    catch (err){throw err}

    // to get visited deps
    try {
        docs = await Orders.find({'orderNo': req.body.currentOrderNo},{
            __v:0,
            _id:0,
            time:0,
            orderNo: 0,
            type: 0,
            currentDepartment:0,
            Dep1:0,
            Dep2:0,
            Dep3:0,
            Dep4:0,
            Dep5:0,
            Dep6:0,
            Dep7:0,
            Dep8:0,
            Dep9:0,
            Dep10:0,
            Dep11:0,
            email:0,
            password:0,
            Dep1EntryTime:0,
            Dep1ExitTime:0,
            Dep2EntryTime:0,
            Dep2ExitTime:0,
            Dep3EntryTime:0,
            Dep3ExitTime:0,
            Dep4EntryTime:0,
            Dep4ExitTime:0,
            Dep5EntryTime:0,
            Dep5ExitTime:0,
            Dep6EntryTime:0,
            Dep6ExitTime:0,
            Dep7EntryTime:0,
            Dep7ExitTime:0,
            Dep8EntryTime:0,
            Dep8ExitTime:0,
            Dep9EntryTime:0,
            Dep9ExitTime:0,
            Dep10EntryTime:0,
            Dep10ExitTime:0,
            Dep11EntryTime:0,
            Dep11ExitTime:0,
            DepNo:0,
            graphNo:0,
            requiredColor:0
        });
        docs.forEach(doc=>{
            let docHolder = doc.toString().replace(/[{'}]/g,'  ');
            docsArr.push(docHolder.split(':'));
        })
    }//13 => 15
    catch (err){throw err}
    let docsArr2 = [];
    docsArr.forEach(rec=>{
        rec.forEach(re=>{
            if(re!=='' && re!=='\\n' && re!=='false'){
                docsArr2.push(re);
            }
        })
    })

    // Update its values
    //let depNoSpaces = docsArr2[1].replace(/ /g, '');
    let No = parseInt(DepNo[0][4]);
    No++;
    let x = docsArr2[5];
    //console.log("1  " + docsArr2[5] +"  2  " + docsArr2[6] +" 3  " + docsArr2[7] + "  4  " + docsArr2[8]  )
    x = x.replace(/^\s+|\s+$/gm,'');
    console.log(orderDep);
    if(orderDep === "??????-??????????") {
        if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? `+`[${orderDep}]`,
                        'Dep2ExitTime':new Date().toLocaleString(),
                        'Dep1EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????'") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? `+`[${orderDep}]`,
                        'Dep3ExitTime':new Date().toLocaleString(),
                        'Dep1EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? `+`[${orderDep}]`,
                        'Dep4ExitTime':new Date().toLocaleString(),
                        'Dep1EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? `+`[${orderDep}]`,
                        'Dep5ExitTime':new Date().toLocaleString(),
                        'Dep1EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? `+`[${orderDep}]`,
                        'Dep6ExitTime':new Date().toLocaleString(),
                        'Dep1EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? `+`[${orderDep}]`,
                        'Dep7ExitTime':new Date().toLocaleString(),
                        'Dep1EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? `+`[${orderDep}]`,
                        'Dep8ExitTime':new Date().toLocaleString(),
                        'Dep1EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? `+`[${orderDep}]`,
                        'Dep9ExitTime':new Date().toLocaleString(),
                        'Dep1EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-????????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? `+`[${orderDep}]`,
                        'Dep10ExitTime':new Date().toLocaleString(),
                        'Dep1EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-????????-????????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? `+`[${orderDep}]`,
                        'Dep11ExitTime':new Date().toLocaleString(),
                        'Dep1EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    else if(orderDep==="??????-??????????-??????????" || orderDep==="??????-??????????-??????????") {
        let type=0;
        if(orderDep==="??????-??????????-??????????")
            type=1;
        else
            type=2;
        if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': '??????-??????????',
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep1ExitTime': new Date().toLocaleString(),
                        'Dep2EntryTime': new Date().toLocaleString(),
                        'DepNo': No,
                        'Dep2Type':type
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': '??????-??????????',
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep3ExitTime': new Date().toLocaleString(),
                        'Dep2EntryTime': new Date().toLocaleString(),
                        'DepNo': No,
                        'Dep2Type':type
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': '??????-??????????',
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep4ExitTime': new Date().toLocaleString(),
                        'Dep2EntryTime': new Date().toLocaleString(),
                        'DepNo': No,
                        'Dep2Type':type
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': '??????-??????????',
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep5ExitTime': new Date().toLocaleString(),
                        'Dep2EntryTime': new Date().toLocaleString(),
                        'DepNo': No,
                        'Dep2Type':type
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': '??????-??????????',
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep6ExitTime': new Date().toLocaleString(),
                        'Dep2EntryTime': new Date().toLocaleString(),
                        'DepNo': No,
                        'Dep2Type':type
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': '??????-??????????',
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep7ExitTime': new Date().toLocaleString(),
                        'Dep2EntryTime': new Date().toLocaleString(),
                        'DepNo': No,
                        'Dep2Type':type
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': '??????-??????????',
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep8ExitTime': new Date().toLocaleString(),
                        'Dep2EntryTime': new Date().toLocaleString(),
                        'DepNo': No,
                        'Dep2Type':type
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': '??????-??????????',
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep9ExitTime': new Date().toLocaleString(),
                        'Dep2EntryTime': new Date().toLocaleString(),
                        'DepNo': No,
                        'Dep2Type':type
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': '??????-??????????',
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep10ExitTime': new Date().toLocaleString(),
                        'Dep2EntryTime': new Date().toLocaleString(),
                        'DepNo': No,
                        'Dep2Type':type
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-????????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': '??????-??????????',
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep11ExitTime': new Date().toLocaleString(),
                        'Dep2EntryTime': new Date().toLocaleString(),
                        'DepNo': No,
                        'Dep2Type':type
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    else if(orderDep === "??????-??????????") {
        if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep1ExitTime':new Date().toLocaleString(),
                        'Dep3EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep2ExitTime':new Date().toLocaleString(),
                        'Dep3EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep4ExitTime': new Date().toLocaleString(),
                        'Dep3EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep5ExitTime': new Date().toLocaleString(),
                        'Dep3EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep6ExitTime': new Date().toLocaleString(),
                        'Dep3EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep7ExitTime': new Date().toLocaleString(),
                        'Dep3EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep8ExitTime': new Date().toLocaleString(),
                        'Dep3EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep9ExitTime': new Date().toLocaleString(),
                        'Dep3EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep10ExitTime': new Date().toLocaleString(),
                        'Dep3EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-????????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep11ExitTime': new Date().toLocaleString(),
                        'Dep3EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    else if(orderDep === "??????-??????????"){
        if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep1ExitTime':new Date().toLocaleString(),
                        'Dep4EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep2ExitTime':new Date().toLocaleString(),
                        'Dep4EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep3ExitTime': new Date().toLocaleString(),
                        'Dep4EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep5ExitTime': new Date().toLocaleString(),
                        'Dep4EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep6ExitTime': new Date().toLocaleString(),
                        'Dep4EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep7ExitTime': new Date().toLocaleString(),
                        'Dep4EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep8ExitTime': new Date().toLocaleString(),
                        'Dep4EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep9ExitTime': new Date().toLocaleString(),
                        'Dep4EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep10ExitTime': new Date().toLocaleString(),
                        'Dep4EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-????????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep11ExitTime': new Date().toLocaleString(),
                        'Dep4EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    else if(orderDep === "??????-??????????"){
        if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep1ExitTime':new Date().toLocaleString(),
                        'Dep5EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep2ExitTime':new Date().toLocaleString(),
                        'Dep5EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep3ExitTime': new Date().toLocaleString(),
                        'Dep5EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep4ExitTime': new Date().toLocaleString(),
                        'Dep5EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep6ExitTime': new Date().toLocaleString(),
                        'Dep5EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep7ExitTime': new Date().toLocaleString(),
                        'Dep5EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep8ExitTime': new Date().toLocaleString(),
                        'Dep5EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep9ExitTime': new Date().toLocaleString(),
                        'Dep5EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep10ExitTime': new Date().toLocaleString(),
                        'Dep5EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-????????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep11ExitTime': new Date().toLocaleString(),
                        'Dep5EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    else if(orderDep === "??????-??????????"){
        if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep1ExitTime':new Date().toLocaleString(),
                        'Dep6EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep2ExitTime':new Date().toLocaleString(),
                        'Dep6EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep3ExitTime': new Date().toLocaleString(),
                        'Dep6EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep4ExitTime': new Date().toLocaleString(),
                        'Dep6EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep5ExitTime': new Date().toLocaleString(),
                        'Dep6EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep7ExitTime': new Date().toLocaleString(),
                        'Dep6EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep8ExitTime': new Date().toLocaleString(),
                        'Dep6EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep9ExitTime': new Date().toLocaleString(),
                        'Dep6EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep10ExitTime': new Date().toLocaleString(),
                        'Dep6EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-????????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep11ExitTime': new Date().toLocaleString(),
                        'Dep6EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    else if(orderDep==="??????-??????????????-??????-??????????????"){
        if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep1ExitTime':new Date().toLocaleString(),
                        'Dep7EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep2ExitTime':new Date().toLocaleString(),
                        'Dep7EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep3ExitTime': new Date().toLocaleString(),
                        'Dep7EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep4ExitTime': new Date().toLocaleString(),
                        'Dep7EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep5ExitTime': new Date().toLocaleString(),
                        'Dep7EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep6ExitTime': new Date().toLocaleString(),
                        'Dep7EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep8ExitTime': new Date().toLocaleString(),
                        'Dep7EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep9ExitTime': new Date().toLocaleString(),
                        'Dep7EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep10ExitTime': new Date().toLocaleString(),
                        'Dep7EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-????????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep11ExitTime': new Date().toLocaleString(),
                        'Dep7EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    else if(orderDep==="??????-??????????????-??????-??????????????"){
        if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep1ExitTime':new Date().toLocaleString(),
                        'Dep8EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep2ExitTime':new Date().toLocaleString(),
                        'Dep8EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep3ExitTime': new Date().toLocaleString(),
                        'Dep8EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep4ExitTime': new Date().toLocaleString(),
                        'Dep8EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep5ExitTime': new Date().toLocaleString(),
                        'Dep8EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep6ExitTime': new Date().toLocaleString(),
                        'Dep8EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep7ExitTime': new Date().toLocaleString(),
                        'Dep8EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep9ExitTime': new Date().toLocaleString(),
                        'Dep8EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep10ExitTime': new Date().toLocaleString(),
                        'Dep8EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-????????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep11ExitTime': new Date().toLocaleString(),
                        'Dep8EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    else if(orderDep==="??????-??????????"){
        if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep1ExitTime':new Date().toLocaleString(),
                        'Dep9EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep2ExitTime':new Date().toLocaleString(),
                        'Dep9EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep3ExitTime': new Date().toLocaleString(),
                        'Dep9EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep4ExitTime': new Date().toLocaleString(),
                        'Dep9EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep5ExitTime': new Date().toLocaleString(),
                        'Dep9EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep6ExitTime': new Date().toLocaleString(),
                        'Dep9EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep7ExitTime': new Date().toLocaleString(),
                        'Dep9EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep8ExitTime': new Date().toLocaleString(),
                        'Dep9EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep10ExitTime': new Date().toLocaleString(),
                        'Dep9EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-????????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep11ExitTime': new Date().toLocaleString(),
                        'Dep9EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    else if(orderDep==="??????-????????-??????????????"){
        if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep1ExitTime':new Date().toLocaleString(),
                        'Dep10EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep2ExitTime':new Date().toLocaleString(),
                        'Dep10EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep3ExitTime': new Date().toLocaleString(),
                        'Dep10EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep4ExitTime': new Date().toLocaleString(),
                        'Dep10EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep5ExitTime': new Date().toLocaleString(),
                        'Dep10EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep6ExitTime': new Date().toLocaleString(),
                        'Dep10EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep7ExitTime': new Date().toLocaleString(),
                        'Dep10EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep8ExitTime': new Date().toLocaleString(),
                        'Dep10EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep9ExitTime': new Date().toLocaleString(),
                        'Dep10EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-????????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep11ExitTime': new Date().toLocaleString(),
                        'Dep10EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    else if(orderDep==="??????-????????-????????????????"){
        if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep1ExitTime':new Date().toLocaleString(),
                        'Dep11EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if(currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep2ExitTime':new Date().toLocaleString(),
                        'Dep11EntryTime':new Date().toLocaleString(),
                        'DepNo':No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep3ExitTime': new Date().toLocaleString(),
                        'Dep11EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep4ExitTime': new Date().toLocaleString(),
                        'Dep11EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep5ExitTime': new Date().toLocaleString(),
                        'Dep11EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep6ExitTime': new Date().toLocaleString(),
                        'Dep11EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep7ExitTime': new Date().toLocaleString(),
                        'Dep11EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????????-??????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep8ExitTime': new Date().toLocaleString(),
                        'Dep11EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-??????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep9ExitTime': new Date().toLocaleString(),
                        'Dep11EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
        else if (currentDep === "??????-????????-??????????????") {
            try {
                await Orders.updateOne({'orderNo': req.body.currentOrderNo}, {
                    $set: {
                        'currentDepartment': orderDep,
                        'visitedDeps': `[${x}] ??? ` + `[${orderDep}]`,
                        'Dep10ExitTime': new Date().toLocaleString(),
                        'Dep11EntryTime': new Date().toLocaleString(),
                        'DepNo': No
                    }
                });
                console.log('order updated');
            } catch (err) {
                throw err;
            }
        }
    }
    console.log(currentDep);
    let depHolder;
    if(currentDep === "??????-??????????")
        depHolder="Dep1";
    else if(currentDep === "??????-??????????")
        depHolder="Dep2";
    else if(currentDep === "??????-??????????")
        depHolder="Dep3";
    else if(currentDep === "??????-??????????")
        depHolder="Dep4";
    else if(currentDep === "??????-??????????")
        depHolder="Dep5";
    else if(currentDep === "??????-??????????")
        depHolder="Dep6";
    else if(currentDep === "??????-??????????????-??????-??????????????")
        depHolder="Dep7";
    else if(currentDep === "??????-??????????????-??????-??????????????")
        depHolder="Dep8";
    else if(currentDep === "??????-??????????")
        depHolder="Dep9";
    else if(currentDep === "??????-????????-??????????????")
        depHolder="Dep10";
    else if(currentDep === "??????-????????-????????????????")
        depHolder="Dep11";
    res.redirect(`/${depHolder}`);
})

module.exports = router;