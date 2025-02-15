import React from 'react';
import { Box, Grid } from '@mui/material';
import MovieItem from './MovieItem';

const ListMovies = () => {
  const movies = [1, 2, 3, 4, 5, 5, 6, 7];

  return (
    <Box mt={2} ml={15}>
      <Grid container spacing={3} justifyContent="center">
        {movies.map((x) => (
          <Grid item xs={12} key={x}>
            <MovieItem
              username="admin@icebattery.com"
              url="https://youtu.be/wJnBTPUQS5A"
              title="Alan Walker - The Spectre"
              description={`Click the link to listen to my latest album: \\nhttps://lnk.to/AlanWalkerWalkerverse\\n\\nAnd my latest music video, Shut Up with UPSAHL.\\nhttps://youtu.be/1sESCIMpx0U\\n\\n△ Merch @  https://store.alanwalker.no △\\n\\nThanks for listening. Check out the official music video here: https://youtu.be/JarfcfEe2No\\n\\n- Alan\\n\\n-----\\n\\nHope you guys like this track - it's a remake of the instrumental ”Spectre” that I released a few years ago. Some of you might recognize it as it’s been part of my live shows lately. It’s a song that I specifically want to dedicate to my core fans, who’ve been following me since the start. Excited to hear what you think, leave your comment in the section below!\\n\\nListen to Walkerverse Pt. 1 here:\\nhttps://alanwalker.lnk.to/WalkerversePt1\\n\\nExperience the playlist for Walkerverse Pt. 1 here: https://youtube.com/playlist?list=PLYT4vq6pQVSsPGIkBqrFDux-fKZXSSZ9g\\n\\nListen to ”The Spectre” on Spotify: http://spoti.fi/2xIFwSk \\nListen to ”The Spectre” on iTunes: http://apple.co/2eBf4po\\nListen to ”The Spectre” on Apple Music: http://apple.co/2vY3I0Y\\nListen to \\"The Spectre\\" on Tidal: https://tidal.com/album/78173586\\nListen to ”The Spectre” via other plattforms: https://AlanWalker.lnk.to/TheSpectre\\n\\n#WorldOfWalker #Spectre #2020 #Music\\n_______________________________\\n\\nFacebook: http://bit.ly/AlanWalker_Facebook\\nInstagram: http://bit.ly/AlanWalker_Instagram\\nTwitter: http://bit.ly/AlanWalker_Twitter\\nTiktok: alanwalkermusic\\nSnapchat: alanwalkermusic\\n\\nSubscribe: https://www.youtube.com/user/djwalkzz?sub_confirmation=1\\nMake sure to subscribe and ring the bell button to get notifications :) \\n______________________________\\n\\n/// Walker Gaming ///\\nWebsite: https://walkergaming.com​\\nInstagram: https://www.instagram.com/w47k3rg4m1ng​\\nFacebook: https://m.facebook.com/w47k3rg4m1ng​\\nTwitch: https://www.twitch.tv/w47k3rg4m1ng​\\nTwitter: https://twitter.com/w47k3rg4m1ng​\\nTikTok: https://vm.tiktok.com/ZMebouDue\\n\\n______________________________\\n\\nVideo credits:\\nConcept: MER\\nDirector: Alexander Zarate Frez & Audun Notevarp\\nDOP: Alexander Zarate Frez & Lars Erik Steffensen\\nEditing: Alexander Zarate Frez\\nMotion Graphics & Grading: Audun Notevarp\\nLighting: Kenneth Tangen\\nChoreography & dancing: Quick Style Studio (Arvin Go, David Leung, Jan Erik Santos, Jonas Storheim)\\n\\nLyrics:\\nHello, hello\\nCan you hear me\\nAs I scream your name\\nHello, hello\\nDo you need me\\nBefore I fade away\\n\\nIs this a place that I call home\\nTo find what I've become\\nWalk along the path unknown\\nWe live, we love, we lie\\n\\nDeep in the dark\\nI don't need the light\\nThere's a ghost inside me\\nIt all belongs to the other side\\nWe live, we love, we lie\\n\\nHello, hello\\nNice to meet you\\nVoice inside my head\\nHello, hello\\nI believe you\\nHow can I forget`}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListMovies;
