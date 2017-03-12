package main

import(
  "github.com/go-martini/martini"
  "github.com/martini-contrib/render"
)

type IndexViewModel struct {
    Title string
}

func IndexRender(r render.Render) {

  viewModel := IndexViewModel{
    "Audio",
  }

  r.HTML(200, "index", viewModel)
}

func main() {

  m := martini.Classic()

  m.Use(render.Renderer(render.Options{
      Directory: "assets/views",
      Extensions: []string{".tmpl", ".html"},
  }))

  m.Use(martini.Static("assets"))

  m.NotFound(func (r render.Render){
      r.Redirect("/")
  })

  m.Get("/", IndexRender)
  m.Run()

}
