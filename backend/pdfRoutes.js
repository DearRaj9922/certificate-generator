const express=require('express');
const { createPdf, fetchPdf, sendPdf } = require('./pdfController');
const pdfRoute=express.Router();

pdfRoute.post('/createPdf',createPdf)//to generate pdf
pdfRoute.get('/fetchPdf',fetchPdf)//to fetch the genrated pdf
pdfRoute.post('/sendPdf',sendPdf) //sent pdf to mail



module.exports=pdfRoute