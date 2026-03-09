const express = require("express");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");
const Machine = require("../models/Machine");
const Inventory = require("../models/Inventory");
const ProductionLog = require("../models/ProductionLog");
const Factory = require("../models/Factory");
const Order = require("../models/Order");

const upload = multer({ dest: "uploads/" });

router.post("/excel", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const workbook = xlsx.readFile(req.file.path);
        const results = {};

        // 1. Process Machines
        if (workbook.SheetNames.includes("Machines")) {
            const machineData = xlsx.utils.sheet_to_json(workbook.Sheets["Machines"]);
            for (const item of machineData) {
                await Machine.findOneAndUpdate(
                    { name: item.name },
                    {
                        uptimeHours: item.uptimeHours,
                        breakdownCount: item.breakdownCount,
                        factoryId: item.factoryId || "admin-factory"
                    },
                    { upsert: true }
                );
            }
            results.machines = machineData.length;
        }

        // 2. Process Inventory
        if (workbook.SheetNames.includes("Inventory")) {
            const inventoryData = xlsx.utils.sheet_to_json(workbook.Sheets["Inventory"]);
            for (const item of inventoryData) {
                await Inventory.findOneAndUpdate(
                    { material: item.material },
                    {
                        quantity: item.quantity,
                        minThreshold: item.minThreshold
                    },
                    { upsert: true }
                );
            }
            results.inventory = inventoryData.length;
        }

        // 3. Process Production Logs
        if (workbook.SheetNames.includes("Production")) {
            const productionData = xlsx.utils.sheet_to_json(workbook.Sheets["Production"]);
            for (const item of productionData) {
                await ProductionLog.create({
                    machineId: item.machineName, // Mapping name for easier Excel entry
                    date: new Date(item.date),
                    shift: item.shift,
                    output: item.output
                });
            }
            results.production = productionData.length;
        }

        // 4. Process Factory
        if (workbook.SheetNames.includes("Factory")) {
            const factoryData = xlsx.utils.sheet_to_json(workbook.Sheets["Factory"]);
            for (const item of factoryData) {
                await Factory.findOneAndUpdate(
                    { name: item.name },
                    {
                        targetOutput: item.targetOutput,
                        powerCostPerKwh: item.powerCostPerKwh,
                        investmentCr: item.investmentCr,
                        turnoverCr: item.turnoverCr
                    },
                    { upsert: true }
                );
            }
            results.factory = factoryData.length;
        }

        // 5. Process Orders
        if (workbook.SheetNames.includes("Orders")) {
            const ordersData = xlsx.utils.sheet_to_json(workbook.Sheets["Orders"]);
            for (const item of ordersData) {
                await Order.findOneAndUpdate(
                    { orderId: item.orderId },
                    {
                        customer: item.customer,
                        quantity: item.quantity,
                        deadline: new Date(item.deadline),
                        status: item.status
                    },
                    { upsert: true }
                );
            }
            results.orders = ordersData.length;
        }

        res.json({ message: "Excel processed successfully", details: results });
    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
