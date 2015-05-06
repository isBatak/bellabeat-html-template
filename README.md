##Opis zadatka

U privitku se nalaze sljedeće datoteke:

Desktop.png — dizajn desktop verzije zamišljene stranice,  
Mobile.png — dizajn mobilne verzije zamišljene stranice,  
resources/leaf.bmp — slika uređaja,  
resources/logo.png — logo.

Kao rješenje zadatka očekujemo implementaciju gornjeg dizajna pomoću HTML-a, CSS-a i Javascript-a. Prilikom izrade obrati pozornost na sljedeće stvari:

1. Klik na SEE VIDEO gumb otvara popup prozor u kojem se treba prikazati video tvoje omiljene pjesme s youtube-a. Idealno bi bilo kada bi se na mobitelu umjesto pop up-a otvarao nativni youtube player.  

2. Prikazani fontovi nisu javno dostupni, tako da ćeš morati sam izabrati font koji je najsličniji ili koji, po tvom mišljenju, najviše paše dizajnu.

3. Validacija forme

4. Klik na SIGN UP gumb šalje AJAX poziv prema REST API-ju (POST na https://test.bellabeat.com/api/web/mailing-list/f04939c8-88c8-42cf-bd1c-a771177adc2c/subscribe, body je oblika: { "email" : EMAIL_IZ_FORME }, ContentType: application/json). Ako server vrati status code 200, znači da je email uspješno spremljen u bazu te je potrebno prikazati poruku o uspjehu. Sam odaberi gdje će poruka biti prikazana, npr. možeš zamijeniti formu s porukom o uspjehu ili napraviti potpuno novu stranicu na kojoj su zahvale. Možeš pretpostaviti da status code različit od 200 znači da je došlo do greške — server bi trebao javiti koja je točno greška u pitanju :)

5. Što se stranica brže loada to bolje.
