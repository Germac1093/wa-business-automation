import { DataProvider } from '../helpers/data-reader';
import { UnlockHelper } from '../helpers/DeviceActions';
import { Gestures } from '../helpers/Gestures';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import  HomeScreen  from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';




const execPromise = promisify(exec);


describe('Abrir wasap desde la pantalla apagada', () => {

    const data = DataProvider.getTestData("whatsapp-test");

    it('Should wake up the device', async () => {
        try {
            // Ejecutamos el comando de ADB
            const { stdout, stderr } = await execPromise('adb shell input keyevent KEYCODE_WAKEUP');
            
            if (stderr) {
                console.error(`Error en el comando: ${stderr}`);
            } else {
                console.log('Comando enviado exitosamente');
            }
        } catch (error: any) {
            throw new Error(`Falló la conexión con ADB: ${error.message}`);
        }
    });

    it('Should unlock the screen with the pattern', async () => {

        await Gestures.swipeUp();
            
        await UnlockHelper.unlockWithPattern();

    });


    it('Should look up whatsapp application and send a message to a contact', async () => {

        if(await HomeScreen.isLauncherActive()){
            await HomeScreen.openApp('WA Business');
        }

        // 3. Entrar al chat específico
        await ChatScreen.openChat(data['contact-name']);
        await ChatScreen.sendMessage(data.message);
    });

});