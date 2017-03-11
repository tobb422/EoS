package main

import(
  "github.com/go-martini/martini"
  "github.com/martini-contrib/render"
)

type IndexViewModel struct {
    Title string
    Description string
}

func IndexRender(r render.Render) {

  viewModel := IndexViewModel{
      "Martini Demo",
      "Description",
  }

  r.HTML(200, "index", viewModel)
}

func main() {

  m := martini.Classic()

  m.Use(render.Renderer(render.Options{
      Directory: "views",
  }))

  m.NotFound(func (r render.Render){
      r.Redirect("/")
  })

  m.Get("/", IndexRender)
  m.Run()

}
