const fs = require('fs');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer(async (req, res) => {
    const data = await readFileFun();
    const updatedData = editJsonFile(data);
    await writeFileFun(updatedData);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updatedData, null, 2));
        
});

const readFileFun = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('cloth1.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

const editJsonFile = (data) => {
    const n_stock = {
        item1: 12,
        item2: 13,
        item3: 50,
        item4: 22,
        item5: 55,
        item6: 87,
        item7: 12,
        item8: 29,
        item9: 10
    };

    for (const item in n_stock) {
        if (data[item]) {
            data[item].stock = n_stock[item]; 
        }
    }
    return data;
};


const writeFileFun = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('new_cloth.json', JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Data saved to new_cloth.json!");
            }
        });
    });
};

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});