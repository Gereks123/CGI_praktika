Tere tulemast päeva pikkuse arvutamise rakenduse reposse!! 😜

#Rakendus on loodud CGI suvepraktikale saamise eesmärgil.
#Eesmärgiks on luua rakendus, mis arvutab päeva pikkust, kasutades pikkus ja -laiuskraade ning kuupäeva parameetritena.

#Tööks kulus umbes 2 päeva, tundides ligi 18h.

Tähtsad punktid olid:

1. Päeva pikkuse arvutamisel tuleb leida päikesetõusu ja -loojangu vaheline aeg.
2. Rakenduse kasutaja peab saama asukohta määrata sisestades koordinaate käsitsi või siis valides asukoha kaardil.

Arenduse teostamiseks kasutasin HTML5, CSS3, JavaScript, jQuery, leafletj.js ning chart.js keeli.

Leian, et ülesande lahendamine sujus mul väga ilusasti. Toon välja etapid, mida ma järgisin enne kui alustasin ülesande lahendamist.

1. Analüüsisin CGI saadetud suvepraktika proovitöö dokumenti.
2. Analüüsi käigus panin endale kirja kõige tähtsamad punktid, millega ma peaksin alustama ning, mis ma tehtud pean saama.
3. Valisin endale arenduskeeled ning panin paberil paika programmi idee ja lahenduse.
4. Lugesin leaflet.js ning chart.js dokumentatsioone, sest need olid uued raamistikud, mida ma ei olnud varem kasutanud.
5. Panin paika rakenduse arhitektuuri ja asusin arendama.

#Rakendus ehitamine -------!

#Rakendus on ülesehitatud funktsioonide inheritance põhimõttel. Lõin funktsioonid iga suurema koodi jupi jaoks ning hakkasin neid funktsioone omavahel siduma, vastavalt konkreetsetele tingimustele.

Päikese loojangu, tõusu ja päevapikkused sain ma kasutades API-d, milleks on Sunrise Sunset API (https://sunrise-sunset.org/api).

#API ühendamisel kasutasin jQuery, kus tegin AJAX calli, mis kutsub andmed esile vastavalt antud laius ja -pikkuskraadile ning kuupäevale. Kuupäeva olemasolu ei olnud oluline, sest kuupäeva puudumisel oleks API kaudu küsitud konkreetse päeva andmeid. Probleemiks on API ajax kutse esialgne sisselaadimine, kui vajutada kaardi peale või kasutada latitude, longitude ja kuupäeva esilekutsumist, siis esimesel korra ei toimi midagi. Teisel kutsel aga kaart loeb andmed ilusti sisse.
Olen veendunud, et probleem oli funktsioonide paiknemisel, ajapuuduse tõttu ei saanud ma praegu seda bugi korda.

#Chart.js oli mulle uus asi, laadisin charti sisse nende API dokumentatsioonis tehtud näite põhjal (https://www.chartjs.org/docs/latest/getting-started/). Probleemseks kujunes API kaudu saadud andmete sisselaadimine, sest kahjuks jäi ajast puudu. Olen veendunud, et ma oleks sellega hakkama saanud!

Lahendatud oleks ma saanud ta nii, et vastavalt kasutaja valitud kuupäevadele, oleks saanud teha API päringu eelnevalt valitud koordinaatide põhjal ning need andmed pannud graafikusse sisse.

#Leaflet.js oli ka uus raamistik, millega ma varem ei ole kokku puutunud. Mulle väga meeldis selle raamistikuga mängida, katsetasin erinevaid meetoteid, kuidas kaardile kuvada neid markereid koos API andmetega ja kõik õnnestus!

#Minu eelised rakenduse loomisel --------------------
Kuna olen JavaScripti, CSS'i, HTML, jQuery ja teisi raamistikke varem kasutanud, siis ma oskasin kohe endale ette kujutada rakenduse struktuuri ja lahendust, mis ma teen. Olen väga entusiastlik koodi suhtes ja armastan koodi kirjutada, eriti meeldib mulle teha tahtlikke kui ka spontaanseid vigu, sest see võimaldab mul koodi paremini meelde jätta.

#Olen väga õnnesärgis sündinud, et sain seda ülesannet lahendada ja nautisin iga koodirea kirjutamist! 🎉🎉
