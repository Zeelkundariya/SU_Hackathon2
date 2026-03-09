const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

function generateSample() {
    const workbook = xlsx.utils.book_new();

    // 1. Machines Sheet
    const machinesData = [
        { name: "Loom-01", uptimeHours: 1200, breakdownCount: 5, factoryId: "admin-factory" },
        { name: "Loom-02", uptimeHours: 850, breakdownCount: 2, factoryId: "admin-factory" },
        { name: "Dyeing-A1", uptimeHours: 500, breakdownCount: 8, factoryId: "admin-factory" }
    ];
    const machinesSheet = xlsx.utils.json_to_sheet(machinesData);
    xlsx.utils.book_append_sheet(workbook, machinesSheet, "Machines");

    // 2. Inventory Sheet
    const inventoryData = [
        { material: "Raw Cotton", quantity: 2500, minThreshold: 500 },
        { material: "Polyester Yarn", quantity: 1200, minThreshold: 300 },
        { material: "Dyeing Chemicals", quantity: 150, minThreshold: 100 }
    ];
    const inventorySheet = xlsx.utils.json_to_sheet(inventoryData);
    xlsx.utils.book_append_sheet(workbook, inventorySheet, "Inventory");

    // 3. Production Sheet
    const productionData = [
        { machineName: "Loom-01", date: "2026-03-01", shift: "Morning", output: 105 },
        { machineName: "Loom-01", date: "2026-03-01", shift: "Evening", output: 95 },
        { machineName: "Loom-02", date: "2026-03-01", shift: "Morning", output: 110 }
    ];
    const productionSheet = xlsx.utils.json_to_sheet(productionData);
    xlsx.utils.book_append_sheet(workbook, productionSheet, "Production");

    // 4. Factory Sheet
    const factoryData = [
        { name: "TexTech Bhilwara", targetOutput: 5000, powerCostPerKwh: 8.5, investmentCr: 12, turnoverCr: 45 }
    ];
    const factorySheet = xlsx.utils.json_to_sheet(factoryData);
    xlsx.utils.book_append_sheet(workbook, factorySheet, "Factory");

    // 5. Orders Sheet
    const ordersData = [
        { orderId: "ORD-101", customer: "Global Apparel", quantity: 1500, deadline: "2026-04-15", status: "In Progress" },
        { orderId: "ORD-102", customer: "EcoTextiles", quantity: 800, deadline: "2026-03-25", status: "Pending" }
    ];
    const ordersSheet = xlsx.utils.json_to_sheet(ordersData);
    xlsx.utils.book_append_sheet(workbook, ordersSheet, "Orders");

    const filePath = path.join(__dirname, 'Sample_Data.xlsx');
    xlsx.writeFile(workbook, filePath);
    console.log(`Sample Excel generated at: ${filePath}`);
}

generateSample();
