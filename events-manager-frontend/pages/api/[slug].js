const {events} = require("./data.json");

export default (req, res)=>{
  if(req.method === "GET"){
    const evt = events.filter(evt=>evt.slug === req.query.slug)
    
    return res.status(200).json(evt)
  }else{
    res.setHeader("Allow", ['GET'])
    res.status(405).json({message: `this method ${req.method} is not allowed.`})
  }
}