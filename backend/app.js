const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

// 오디오 파일 경로
const audioFilePath = path.join(__dirname, "/public/audio", "1.mp3");

// HTTP Range 요청 처리
app.get("/audio", (req, res) => {
  const range = req.headers.range;

  if (!range) {
    return res.status(416).send("Requires Range header");
  }

  // 파일 크기 가져오기
  const audioSize = fs.statSync(audioFilePath).size;

  // Range 헤더에서 시작 바이트 추출
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE - 1, audioSize - 1);

  // Content-Range 및 Content-Length 설정
  const contentLength = end - start + 1;
  res.status(206).header({
    "Content-Range": `bytes ${start}-${end}/${audioSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "audio/mpeg",
  });

  // 스트리밍으로 파일 읽기 및 응답
  const stream = fs.createReadStream(audioFilePath, { start, end });
  stream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
