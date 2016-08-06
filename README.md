###Setup
- install protoc (from github source or install pre-compiled package)
- clone `https://github.com/google/protobuf/tree/master/js` and npm link to this project

###Commands
- `protoc --js_out=. messages.proto` and the generated js file could be bundled with Closure compiler.
- `protoc --js_out=import_style=commonjs,binary:. messages.proto` passed in some GeneratorOptions

###Working with Golang
- `go get -u github.com/golang/protobuf/protoc-gen-go` to get a go compiler to work with protoc compiler
- `protoc --go_out=. go_customer.proto`