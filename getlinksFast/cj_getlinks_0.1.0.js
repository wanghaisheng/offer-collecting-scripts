const localStorgeTmpKey = "__campain_site_cj";
const getlinkBtnQuery = ".get-links-container";
const tableQuery = ".adv-row-wrapper";
const nameQuery = ".adv-name";

window.scrollTo(0, document.body.scrollHeight);
const table = document.querySelectorAll(tableQuery);

async function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

const run = async () => {
    let requestTime = 0;
    let names = "";
    let uris = "";
    for(let t of table) {
        requestTime = 0;
        let uriBefore = localStorage.getItem(localStorgeTmpKey);
        let name = t.querySelector(nameQuery).innerText;
        let jumpUri = t.querySelector(getlinkBtnQuery).querySelector("a").getAttribute("href");
        let win = window.open(jumpUri, "_blank", "height=100;weight=100;");
        while(requestTime < 30) {
            let uri = localStorage.getItem(localStorgeTmpKey);
            if(uri != null && uri != uriBefore) {
                names = names + name + "\n";
                uris = uris + uri + "\n"; 
                break;
            }
            requestTime++;
            await sleep(5000);
        }
        win.close();
    }
    console.log(names);
    console.log(uris);
}

await run();
