import puppeteer,{Browser,Page} from 'puppeteer';

export async function instaScraping(username:string){

    const instagram = "https://www.instagram.com/";

    const picuki = "https://www.picuki.com/profile/";

    const profile:string = `${instagram}${username}`
    
    const browser:Browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    
    const page:Page = await browser.newPage();

    await page.goto(profile);

    const images = await page.$eval('._6q-tv', (e:any)=>e.src);
    // const followers = await page.$eval('.followed_by', (e:any)=>e.innerText);

    // const instaimage = await page.evaluate(()=>{
    //     //@ts-ignore
    //     let image = document.querySelector('._6q-tv').getAttribute('src')

    //     return image;
    // })

    browser.close();

    return {
        imageProfile: images,
        // followers: parseInt(followers)
    };

}