import React, { useState, useEffect } from 'react';
import Lecture from './components/Lecture/Lecture';
import LectureList from './components/LectureList/LectureList';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import VIDEOS from './mockData/video';
import Nav from './components/Nav/Nav';
import BASE_URL from '../../config';

function LectureVideo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedLecture, setSelectedLecture] = useState();
  const [lectureList, setLectureList] = useState();
  const [videoId, setVideoId] = useState(searchParams.get('videoId'));
  const [classId, setClassId] = useState(searchParams.get('classId'));

  console.log('classId : ', classId);
  console.log('videoId : ', videoId);

  const token = localStorage.getItem('Token');

  useEffect(() => {
    fetch(`${BASE_URL}/video/${classId}`, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(result => {
        console.log('result : ', result);
        setLectureList(result.video);
      });
  }, []);

  useEffect(() => {
    lectureList?.map(video => {
      if (Number(videoId) === Number(video.id)) {
        setSelectedLecture(video);
      }
    });
  }, [videoId, lectureList]);

  console.log('lectureList : ', lectureList);

  return (
    <>
      <Nav />
      <LectureContainer>
        <Lecture selectedLecture={selectedLecture} />
        <LectureList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          lectureList={lectureList}
          setVideoId={setVideoId}
        />
      </LectureContainer>
    </>
  );
}

const LectureContainer = styled.div`
  ${props => props.theme.variables.flex('row', '', '')}
  margin-top:80px;
  background-color: black;
`;

export default LectureVideo;
