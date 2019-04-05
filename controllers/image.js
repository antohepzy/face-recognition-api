var Clarifai = require ('clarifai');

const app = new Clarifai.App({
 apiKey: '693c5c7feca545538ca0bf3a533045f1'
});

const handleApiCall = (req,res) => {
	const { input } = req.body;
	app.models.predict("a403429f2ddf4b49b307e318f00e528b", input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=> res.status(400).json('unable to get response from API'))
}


const handleEntries = (req, res,db) => {
  const {id} = req.body;
  db('users').where({id})
  .increment('entries',1)
  .returning('entries')
  .then(entries=>{
    res.json(entries[0]);
  })
  .catch(err=>res.status(400).json("unable to get entries"))
}

module.exports = {
	handleEntries,
	handleApiCall
}