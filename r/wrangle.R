#test

library(dplyr)
library(leaflet)
library(jsonlite)
library(knitr)


setwd("C:/Users/Evan/Github/nwhacks2016/")

data <- read.csv("data/Computer_Media_Center.csv")

m <- leaflet() %>% 
  addTiles() %>% 
  addMarkers(lng = data$Longitude, lat = data$Latitude, popup = data$Address)

m


fuck <- fromJSON("https://api.coursera.org/api/courses.v1")

fuck
