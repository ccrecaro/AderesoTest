import * as app from "./app.js";
import 'mocha';


const article = {"type": "article", "url": "https://adereso.helpkit.so/novedades/3F7uRjAARGuz68fdH4ho7E/previsualizaci%C3%B3n-publicidad-de-facebook/qJg2kGXGVv1nnB8hzbZn45", "text": "Previsualizaci\u00f3n Publicidad de Facebook\n\u00bfQu\u00e9 es? Actualmente en Adereso, es posible visualizar el contenido de una publicaci\u00f3n proveniente de Publicidad Paga de Facebook dentro del canal de WhatsApp. \u00bfC\u00f3mo utilizarlo? En la publicidad paga de Facebook, si el cliente desea contactarse con la empresa, puede hacer clic la misma para redireccionarlo al canal de WhatsApp. Si el usuario manda un mensaje, se genera un ticket de WhatsApp en Adereso, el cual contendr\u00e1 adem\u00e1s el contenido de la publicidad de Facebook. Por ahora, solo es posible visualizar el t\u00edtulo de la publicaci\u00f3n y el contenido de texto. Ser\u00e1 posible desplegar una nueva ventana haciendo clic en el icono de la derecha: \ud83d\udd0e En caso de que tengas dudas o el problema persista, comun\u00edcate con nosotros v\u00eda chat, al WhatsApp +56944501722 o al email soporte@adere.so"};
describe("APP", function () {
    describe('getTitle', async function() {
        var title = await app.getTitle(article);
        it('should return an string', function() {
          title.should.be.a('string');
        });
        it('should not be empty', function() {
            expect(title).to.not.be.empty;
        });
    });
    
    describe('getSummary', async function() {
        var title = await app.getSummary(article);
        it('should return an string', function() {
          title.should.be.a('string');
        });
        it('should not be empty', function() {
            expect(title).to.not.be.empty;
        });
    });
    
    describe('getTags', async function() {
        var title = await app.getTags(article);
        it('should return an string', function() {
          title.should.be.a('string');
        });
        it('should not be empty', function() {
            expect(title).to.not.be.empty;
        });
    });
    
    describe('getReference', async function() {
        var title = await app.getReference(article);
        it('should return an string', function() {
          title.should.be.a('string');
        });
        it('should not be empty', function() {
            expect(title).to.not.be.empty;
        });
        it('should have url', function() {
            expect(title).to.have.string(article.url);
        });
    });
})
