App.CreateController = Ember.Controller.extend(
  current_product_type: "textbook"
  product_types: [
    {
      value: "textbook"
      label: "**教科書**"
    }
    {
      value: "clothes"
      label: "上衣"
    }
    {
      value: "coat"
      label: "外套"
    }
    {
      value: "pantskirt"
      label: "褲裙"
    }
    {
      value: "dress"
      label: "連身裝"
    }
    {
      value: "shoes"
      label: "鞋類"
    }
    {
      value: "accessories"
      label: "飾品"
    }
    {
      value: "cosmeceutical"
      label: "藥妝"
    }
    {
      value: "electronics"
      label: "3C產品"
    }
    {
      value: "book"
      label: "一般書籍"
    }
    {
      value: "others"
      label: "其他"
    }
  ]

  # for clothes, coat, pantskirt, and dress
  typeIsClothes: (->
    types = "clothes,coat,pantskirt,dress".split(",")
    -1 isnt types.indexOf(@get("current_product_type"))
  ).property("current_product_type")

  # for shoes
  typeIsShoes: (->
    @get("current_product_type") is "shoes"
  ).property("current_product_type")
  cloth_sizes: "Free size,XS,S,M,L,XL,XXL".split(",")
)
