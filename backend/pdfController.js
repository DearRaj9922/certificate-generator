
//we use html-pdf
const pdf=require('html-pdf')
const path=require('path')
const nodemailer=require('nodemailer')
const fs=require('fs')

const pdfTemplate=require("./documents/document")
const env=require('dotenv')
env.config()

exports.createPdf=(req,res)=>{
    const options = { format: 'A4', 
                      orientation: 'landscape',
                      border: '0',
                      type: 'pdf',
                      quality: '100' };

    pdf.create(pdfTemplate(req.body),options).toFile('certificate.pdf',(err)=>{
        if(err){
            console.log(err);
        }
        res.send('pdf generated')
    })

}

exports.fetchPdf=(req,res)=>{
    res.sendFile(path.join(__dirname, 'certificate.pdf'))
}
exports.sendPdf=(req,res)=>{


    pathToAttachment=path.join(__dirname, 'certificate.pdf')
    attachment=fs.readFileSync(pathToAttachment).toString("base64")

    let smtpTransport=nodemailer.createTransport({
        service:'gmail',
        port:587,
        secure:false,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        },

    })

    smtpTransport.sendMail({
        from:process.env.EMAIL,
        to:req.body.email,
        subject:'Pdf Generated document',

        html:`
        Testing Pdf Generate document,Thanks`,
        attachments:[
            {
                content:attachment,
                filename:'certificate.pdf',
                type:'application/pdf',
                path:pathToAttachment
            }
        ]
    },function(error,info){
        if(error){
            console.log(error);
        }
        res.send("Mail has been sended.check the email")
    })
}
// exports.createPdf=createPdf
// exports.fetchPdf=fetchPdf
// exports.sendPdf=sendPdf