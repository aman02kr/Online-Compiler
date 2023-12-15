const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Job =require("./models/Job");
const Code = require('./models/Code');
const connectDB=require("./db");
const dotenv =require("dotenv");
const {submitCode,languageId, getLanguageId,getSubmissionResultWithDelay}=require("./Execute_Code");
app.use(cors());
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
dotenv.config();


connectDB();


app.get("/status",async(req,res)=>{
    const jobId=req.query.id;
    console.log("status requested",jobId);
    if(jobId==undefined){
        return res
        .status(400)
        .json({success: false,error :"missing id query params"});
    }
    try{
        const job=await  Job.findById(jobId);
        if(job ===undefined){
            return res.status(404).json({success: false,error :"invalid job id"});
        }
        return res.status(200).json({success:true , job});
    }
    catch(err){
        return res.status(400).json({success: false,error :JSON.stringify(err)});

    }
});

app.post("/run", async (req, res) => {
    const { language = "cpp", code,input } = req.body; //sets default language to cpp if not in the request
    console.log(language, code.length);
    if (code === undefined) {
        return res.status(400).json({ sucess: false, error: "empty  body" });
    }
    let job;
    try {


        job=await new Job({language}).save();
        const jobId=job["_id"];
        res.status(201).json({sucess:true,jobId});
        console.log(job);
        let output;
        let languageId;
        job["startedAt"]=new Date();
        languageId=getLanguageId(language);
        try {
            // Submit code for execution
            const submissionToken = await submitCode(code, languageId, input);
            console.log('Code submitted successfully. Submission token:', submissionToken);

            // Wait for the submission result with a delay
            const result = await getSubmissionResultWithDelay(submissionToken, 5000);
            console.log('Submission result:', result);

            // Process the result
            output = result.stdout;
            console.log(output);

        } catch (submissionError) {
            // Handle submission error
            console.error('Error submitting code to Judge0 API:', submissionError.message);
            job["completedAt"] = new Date();
            job["status"] = "failed";
            job["output"] = "Submission error";
            await job.save();
            return;
        }

        // Update job details after successful execution
        job["completedAt"] = new Date();
        job["status"] = "success";
        job["output"] = output;
        await job.save();
        console.log(job);

    } catch (error) {
        // Handle database or other errors
        console.error('Error:', error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


app.post('/save-code', async (req, res) => {
    const { userId, code, language,fileName } = req.body;
  
    try {
      const savedCode = await Code.create({ userId, code, language,fileName });
      res.json(savedCode);
      console.log("code saved");
    } catch (error) {
      console.error('Error saving code:', error);
      res.status(500).json({ error: 'Error saving code' });
    }
  });
  // Fetch user codes
app.get('/user-codes/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const userCodes = await Code.find({ userId });
      res.json(userCodes);
    } catch (error) {
      console.error('Error fetching user codes:', error);
      res.status(500).json({ error: 'Error fetching user codes' });
    }
  });
  app.delete('/delete-code/:codeId', async (req, res) => {
    const codeId = req.params.codeId;
  
      const deletedCode = await Code.findByIdAndRemove(codeId);
  
      if (!deletedCode) {
        return res.status(404).json({ message: 'Code not found' });
      }
  
      // Return success message
      res.status(200).json({ message: 'Code deleted successfully' });
    } 
  );
  
app.listen(5000, () => {
    console.log("Listening on port 5000");
});