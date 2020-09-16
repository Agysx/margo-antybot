# Przykład działania antybota w margonem

Przykład antybota który wyeliminuje 90% botów w margonem i tym samym nie wpłynie na komfort gry (zero wyskakujących okienek).

## Zasada działania

- silnik raz na jakiś czas wysyła graczom skrypt javascript do wykonania za pomocą funkcji `eval`

- wykonany skrypt nasłuchuje zdarzeń typu: kliknięcie myszką / użycie klawisza na klawiaturze odpowiedzialnego za ruch postaci

- przy wykonaniu jednego z owych zdarzeń wysyłana jest wiadomość do silnika gry z informacją o ruchu oraz specjalnym kodem który umieszczony jest w kodzie i zapisany po stronie silnika

- silnik porównuje akcje użytkownika (poruszanie się postaci) z informacjami o kliknięciu myszki / klawiatury

- jeśli postać poruszyła się, a informacje o zdarzeniach nie zostały wysłane możemy wnioskować że gracz korzysta z nielegalnego oprogramowania, które wykonuje akcje użytkownika bez użycia klawiatury i myszki

- skrypt po wysłaniu informacji przestaje nasłuchiwać zdarzeń

## Czy da się przeciwdziałać i zrobić anty-antybota

Padło kilka propozycji oszukania tego systemu:

- wysyłanie eventów `dispatchEvent` przy każdym ruchu postaci

> Odp: najnowsze przeglądarki mają możliwość odróżnienia zdarzeń wykonanych przez użytkownika od wykonanych przez skrypty javascript

- ignorowanie skryptu sprawdzającego - wyłaczenie funkcji `eval`

> Odp: taki zabieg, sprawi że silnik nie doczeka się informacji o kliknięciu myszki / klawiatury i stwierdzi że gracz korzysta z bota

- wykorzystanie aplikacji typu autoclicker

> Odp: oszust musiałby skonfigurować taki program żeby klikanie pokrywało się z poruszaniem się postaci, praktyczne trudne do zrealizowania

- wysłanie randomowych informacji o zdarzeniach do silnika, przy ruchu postaci

> Odp: w skrypcie weryfikacyjnych umieszczony byłby specjalny kod pozwalający silnikowi odróżnić randomową odpowiedź od tej prawdziwej

- analiza kodu sprawdzającego

> Odp: skrypt weryfikujący były obfuskowany (zaciemniany) tzn. nieczytelny a także losowy za każdym razem, a więc stworzenie uniwersalnego skryptu autmatycznie analizującego go byłaby bardzo trudne
