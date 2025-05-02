const express = require("express");
const { getAllInspections, getInspectionById, createOrUpdateInspection, updateInspectionStatus , finalizeInspectionStatus ,inspectionForParticularUser } = require("../controllers/inspectionController");

const router = express.Router();

router.get("/", getAllInspections);
router.get("/:id", getInspectionById);
router.post("/", createOrUpdateInspection);
router.put("/:id/status", updateInspectionStatus);
router.put("/:id/finalize", finalizeInspectionStatus);
router.get("/user/inspections", inspectionForParticularUser);



module.exports = router;
