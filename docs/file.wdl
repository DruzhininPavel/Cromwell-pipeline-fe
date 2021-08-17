task hello {
  String name
  String lastName

  command {
    echo 'Hello ${name} ${lastName}!'
  }

  output {
    File response = stdout()
  }

  runtime {
    docker: "ubuntu:latest"
  }
}

workflow test {
  call hello
}

// inputs.json
{"test.hello.name": "Pavel", "test.hello.lastName": "Druzhini"}
//