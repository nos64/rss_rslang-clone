/* eslint-disable no-nested-ternary */
import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconVolumeUp from '@mui/icons-material/VolumeUp';
import IconLocalLibrary from '@mui/icons-material/LocalLibraryRounded';
import IconLibraryAddCheck from '@mui/icons-material/LibraryAddCheck';
import Tooltip from '@mui/material/Tooltip';
import { API_URL } from '../../../variables/constants';
import { WordInterface } from '../../../types/common';
import textbookStore from '../../../store/textbook';
import ViewWordStat from '../ViewWordStat/ViewWordStat';

interface ITextBookCardProps {
  card: WordInterface;
  isAuth: boolean;
  isDifficult: boolean;
  isDifficultPage: boolean;
  isLearned: boolean;
}

const TextbookCard: React.FC<ITextBookCardProps> = observer(
  ({ card, isAuth, isDifficult, isDifficultPage, isLearned }) => {
    const audio = useRef<HTMLAudioElement>(null);

    const wordAudioSrc = `${API_URL}/${card.audio}`;
    const exampleAudioSrc = `${API_URL}/${card.audioExample}`;
    const meaningAudioSrc = `${API_URL}/${card.audioMeaning}`;

    const handleSound = () => {
      audio.current?.play();
    };

    const handleAudioSrc = () => {
      switch (audio.current?.src) {
        case wordAudioSrc: {
          audio.current.src = meaningAudioSrc;
          audio.current?.play();
          break;
        }
        case meaningAudioSrc: {
          audio.current.src = exampleAudioSrc;
          audio.current?.play();
          break;
        }
        case exampleAudioSrc: {
          audio.current.src = wordAudioSrc;
          break;
        }
        default: {
          break;
        }
      }
    };

    const falseIconCSS = {
      width: '36px',
      height: '36px',
      cursor: 'pointer',
      color: 'transparent',
      stroke: '#757575',
      strokeWidth: '1',
    };

    const trueIconCSS = {
      width: '36px',
      height: '36px',
      cursor: 'pointer',
      color: '#757575',
    };

    const handleDifficult = () => {
      if (!isDifficultPage) {
        if (!isDifficult) {
          textbookStore.setDifficultWord(card);
        }
      } else {
        textbookStore.deleteDifficultWord(card);
      }
    };

    const handleLearned = async () => {
      if (isLearned) {
        await textbookStore.deleteLearnedWord(card);
      } else {
        await textbookStore.setLearnedWord(card);
      }
    };

    return (
      <Card
        component="li"
        sx={{
          display: 'flex',
          border: '1px solid grey',
          backgroundColor:
            isAuth && isDifficult ? '#C5CAE9' : isAuth && isLearned ? '#CDDC39' : 'transparent',
        }}
        key={card.id}
      >
        <Box sx={{ display: 'flex', width: '100%', position: 'relative' }}>
          {textbookStore.userId && <ViewWordStat word={card.word} userId={textbookStore.userId} />}
          <CardMedia
            component="img"
            src={`${API_URL}/${card.image}`}
            sx={{ height: '250px', flexBasis: '25%' }}
          />
          <CardContent
            sx={{
              flexBasis: '70%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
              <Typography variant="h5">{card.word}</Typography>
              <Typography variant="h5">{card.transcription}</Typography>
              <Typography variant="h5" sx={{ color: '#757575' }}>
                {card.wordTranslate}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" dangerouslySetInnerHTML={{ __html: card.textMeaning }} />
              <Typography variant="subtitle2" sx={{ color: '#757575' }}>
                {card.textMeaningTranslate}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" dangerouslySetInnerHTML={{ __html: card.textExample }} />
              <Typography variant="subtitle2" sx={{ color: '#757575' }}>
                {card.textExampleTranslate}
              </Typography>
            </Box>
          </CardContent>
          <CardContent
            sx={{
              flexBasis: '5%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CardMedia component="audio" src={wordAudioSrc} ref={audio} onEnded={handleAudioSrc} />
            <Tooltip title="прослушать">
              <IconVolumeUp
                onClick={handleSound}
                sx={{ width: '36px', height: '36px', cursor: 'pointer', color: '#757575' }}
              />
            </Tooltip>

            {isAuth && (
              <>
                <Tooltip title="словарь">
                  <IconLocalLibrary
                    sx={isDifficult ? trueIconCSS : falseIconCSS}
                    onClick={handleDifficult}
                  />
                </Tooltip>
                <Tooltip title="изученные слова">
                  <IconLibraryAddCheck
                    sx={isLearned ? trueIconCSS : falseIconCSS}
                    onClick={handleLearned}
                  />
                </Tooltip>
              </>
            )}
          </CardContent>
        </Box>
      </Card>
    );
  }
);

export default TextbookCard;
