const express = require("express"); 
const {
  createJob,
  updateJobStatus,
  getAllJobs,
  getJobByJobNo,
  searchJob,
  updateJobById,
  deleteJobById,        
  deleteJobByJobNo,    
  generateJobPDF,
} = require("../controllers/job.controller");

const router = express.Router();

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/status", searchJob);
router.put("/:jobNo/status", updateJobStatus);
router.put("/:id", updateJobById);
router.delete("/by-id/:id", deleteJobById);         
router.delete("/by-jobno/:jobNo", deleteJobByJobNo); 

router.get("/:jobNo", getJobByJobNo);
router.get("/:jobNo/pdf", generateJobPDF);

module.exports = router;
