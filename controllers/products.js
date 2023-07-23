const Product = require("../models/product");


const getallproducts = async(req,res)=>{
     
    const {company,name,featured,sort,select} = req.query;
    const queryobject = {};

    if(company){
        queryobject.company = company;
       
    }
    if(featured){
        queryobject.featured = featured;
    }
    if(name){
        queryobject.name = {$regex:name,$options:"i"};
    }


    let apidata = Product.find(queryobject);

    if(sort){
        let sortfix = sort.replace(","," ");
        apidata = apidata.sort(sortfix);
    }


    if(select){
        let selectfix = select.split(",").join(" ");
        apidata = apidata.select(selectfix);
    }


    let page = Number(req.query.page)||1;
    let limit = Number(req.query.limit)||3;
    let skip = (page-1)*limit;
    apidata = apidata.skip(skip).limit(limit);

    console.log(queryobject);   


    const myData = await apidata;
    res.status(200).json({myData,nbHits:myData.length});
};


const getallproductstesting = async(req,res)=>{
    const myData = await Product.find(req.query);
    res.status(200).json({myData});
};


module.exports = {getallproducts,getallproductstesting};