'use strict'

//model
const Gorev = use("App/Models/Gorevler")
//validator
const {validate} = use('Validator')
class PostController {
    async index({view}){
        const gorev = await Gorev.all()
        return view.render("anasayfa",{
            gorevler:gorev.toJSON()
        })
    }
    async gorev({view}){
        return view.render("gorev")
    }
    async yeni({session,request,response}){
        const kontrol = await validate(request.all(),{
            gorev:"required|min:4|max:255",
        })
        if(kontrol.fails()){
            session.withErrors(kontrol.messages()).flashAll()
            return response.redirect("back")
        }
        const yeni = new Gorev()
        yeni.gorev = request.input("gorev")
        await yeni.save()
        session.flash({
            alert:"Görev Kaydedildi"
        })
        response.redirect("/")
    }
    async sil({response,params,session}){
        const gorev = await Gorev.find(params.id)
        await gorev.delete()
        session.flash({
            alert:"Görev Silinmiştir"
        })
        return response.redirect("/")
    }
}

module.exports = PostController
