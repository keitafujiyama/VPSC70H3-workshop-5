function setup () {
  let channel = 'VOTING';
  let height = windowHeight;
  let server;
  let width = windowWidth;

  createCanvas (width, height);

  let choice = new URL (window.location.href).searchParams.get ('choice');
  let user = 'user' + random (0, 1000000000);

  console.log ('USER: ' + user);

  server = new PubNub ({
    publishKey: 'pub-c-27e0809f-ee2b-4e8c-aed2-3b8b472bb4cc',
    subscribeKey: 'sub-c-12fc72f3-62e9-4a16-b232-1ad926996b8f',
    uuid: user,
  });

  server.subscribe ({channels: [channel]});

  if (choice != null) {
    server.publish ({
      channel: channel,
      message: choice,
    });
  
    console.log ('CHOICE: ' + choice);
  }

  server.fetchMessages ({
    channels: [channel],
    count: 999,
  }, (_, response) => {
    console.log (response);

    for (let i = 0; i < response.channels.VOTING.length; i ++) {
      switch (response.channels.VOTING [i].message) {
        case 'BEEF':
          fill (255, 0, 0);

          circle (random (width * 0.05, width * 0.45), random (height * 0.05, height * 0.95), (height + width) * 0.025);
          break;
  
        case 'CHICKEN':
          fill (0, 0, 255);

          circle (random (width * 0.55, width * 0.95), random (height * 0.05, height * 0.95), (height + width) * 0.025);
          break;
      }
    }
  });

  noStroke ();
  textAlign (CENTER);
  textSize ((height + width) * 0.05);
  textStyle (BOLD);
  text ('BEEF', width * 0.25, height * 0.5);
  text ('CHICKEN', width * 0.75, height * 0.5);
}
