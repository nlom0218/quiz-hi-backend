-- CreateTable
CREATE TABLE "_TeacherStudentRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherStudentRelation_AB_unique" ON "_TeacherStudentRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherStudentRelation_B_index" ON "_TeacherStudentRelation"("B");

-- AddForeignKey
ALTER TABLE "_TeacherStudentRelation" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherStudentRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
