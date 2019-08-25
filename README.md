## DD APM TESTING
capture traces being sent to localhost:8126 and run a test suite against them

### Requirements (for MacOS)

- [Datadog Agent + Trace agent running on localhost:8126)](https://docs.datadoghq.com/agent/)
- [Wireshark + tshark](https://www.wireshark.org/download.html)
- [Node/NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Requirements for example python application

- [ddtracepy](https://github.com/DataDog/dd-trace-py)
- [flask](https://flask.palletsprojects.com/en/1.1.x/)

### Setup

1. To begin capturing traces, with wireshark installed and the datadog agent listening for traces on localhost:8126, run from the base of the `dd_apm_testing` directory

`tshark -f 'tcp port 8126' -Y 'http.request.method == PUT' -i 'lo0' -T json > ./spec_output.json`

2. To generate traces to run your test suite against, you can create traces locally with any application that has an officially support DD Tracing Client installed and configured to send traces to it's default localhost:8126. Or, to send traces using example application, install the latest version of dd-trace-py and flask, then run

```
dd_apm_testing $ cd example_flask_app
example_flask_app $ export FLASK_RUN=example_apm_flask_web_server.py
example_flask_app $ export FLASK_RUN_PORT=3000
example_flask_app $ flask run
example_flask_app $ curl localhost:3000
example_flask_app $ curl localhost:3000/api
example_flask_app $ curl localhost:3000/hello
```

3. To run the test suite, first kill the tshark packet capture program `[ctrl+c]`, then from the base of your `dd_apm_testing` directory, run:

`jasmine`

4. view the output of your test suite and a table view of your traces in the console

