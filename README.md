Security: 

[JSX Prevents Injection Attacks](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)
By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.