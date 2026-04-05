import { $ } from '@wdio/globals';
 
class HomeScreen{

    private iconByContentDescription(description : string){
        return $(`~${description}`);
    }

    async openApp(appName : string){

        driver.pause(2000);
        const appIcon = this.iconByContentDescription(appName);
        if(await appIcon.isExisting()){
            await appIcon.click();
        }else{
            throw new Error(`No se encontro la aplicacion "${appName}" en la pantalla`);
        }
    
    }

    async isLauncherActive() : Promise<boolean>{
        const launcherPackage = 'com.miui.home';
        const currentPackage = await driver.getCurrentPackage();
        return currentPackage === launcherPackage;
    }
}

export default new HomeScreen();