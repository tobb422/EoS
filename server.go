package main

import (
  "net/http"
  "github.com/labstack/echo"
)

func main() {

    e := echo.New()

    e.GET("/", func(c echo.Context) error {
        return c.String(http.StatusOK, "Hello, World!")
    })

    e.GET("/users/:id", func(c echo.Context) error {
        jsonMap := map[string]string{
            "name": "toshiki",
            "hoge": "hoge",
        }
        return c.JSON(http.StatusOK, jsonMap)
    })

    e.Logger.Fatal(e.Start(":8080"))
}
