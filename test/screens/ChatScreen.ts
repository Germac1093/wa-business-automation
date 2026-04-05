import { $ } from '@wdio/globals';

 class ChatScreen {
    /**
     * Busca la fila del chat que contiene el nombre del contacto.
     * Usamos una estrategia de "parent-child": buscamos el texto y subimos al contenedor clickeable.
     */
    private chatRow(contactName: string) {
        // Este selector busca un TextView con el nombre y selecciona al ancestro que es clickeable (la fila)
        const selector = `android=new UiSelector().resourceId("com.whatsapp.w4b:id/contact_row_container").childSelector(new UiSelector().text("${contactName}"))`;
        return $(selector);
    }

    /**
     * Abre la conversación de un contacto específico
     */
    async openChat(contactName: string) {
        const row = this.chatRow(contactName);
        
        await row.waitForExist({ timeout: 5000 });
        await row.click();
    }

    /**
     * Verifica si el chat de un contacto está visible
     */
    async isChatVisible(contactName: string): Promise<boolean> {
        return await this.chatRow(contactName).isDisplayed();
    }

    async sendMessage(message : string){
        const inputMessage = await $('id:com.whatsapp.w4b:id/entry');
        await inputMessage.waitForDisplayed({timeout : 2000});
        await inputMessage.setValue(message);

        const sendButton = await $('id:com.whatsapp.w4b:id/send');
        await sendButton.click();

    }
}

export default new ChatScreen();