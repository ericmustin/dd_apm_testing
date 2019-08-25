// tshark -f 'tcp port 8126' -Y 'http.request.method == PUT' -i 'lo0' -T json > ./spec_output.json
const msgpack = require('msgpack-lite')
const codec = msgpack.createCodec({ int64: true })
var captured_packets = require("../../../spec_output.json");

beforeEach(function () {

var trace_details = captured_packets.map(function(x) {
  var media_type = x._source.layers.media['media.type'].split(":").join("")
  
  // from https://jsfiddle.net/antlafarge/wrjzt1zy/
  var bytes = []

    for (var c = 0; c < media_type.length; c += 2) {
      bytes.push(parseInt(media_type.substr(c, 2), 16));
    }

  var decoded = msgpack.decode(new Uint8Array(bytes))

  return decoded[0]
})

this.traces = trace_details

});