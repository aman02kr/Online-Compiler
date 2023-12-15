const mongoose=require('mongoose');
const JobSchema =mongoose.Schema({
    language:{
        type:String,
        required:true,
        enum:['c',
        'cpp',
        'java',
        'py',
        'rb',
        'cs',
        'js',
        'go',
        'php',
        'rs',
        'ts',
        ]
    },
    submittedAt: {
        type:Date,
        default:Date.now
    },
    completedAt:{
        type:Date
    },
    output:{
        type:String

    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","success","error"]
    }
});
const Job=new mongoose.model('job',JobSchema);
module.exports=Job;