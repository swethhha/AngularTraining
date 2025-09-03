using BugTrack.Application.Services;
using BugTrack.Core.Entities;
using BugTrack.Core.Interfaces;
using BugTrack.Core.DTOs;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace BugTrack.Tests.Services
{
    public class BugServiceTests
    {
        private readonly IBugService _bugService;
        private readonly Mock<IBugRepository> _bugRepositoryMock;

        public BugServiceTests()
        {
            _bugRepositoryMock = new Mock<IBugRepository>();
            _bugService = new BugService(_bugRepositoryMock.Object);
        }

        [Fact]
        public void GetAllBugs_ShouldReturnListOfBugResponseDTO()
        {
            // Arrange
            var bugs = new List<Bug>
            {
                new Bug
                {
                    Id = 1,
                    Title = "Bug 1",
                    Description = "Description 1",
                    Status = "Open",
                    CreatedOn = DateTime.UtcNow,
                    Project = new Project
                    {
                        ProjectName = "Project B",
                        Description = "Sample project description" // required
                    }
                },
                new Bug
                {
                    Id = 2,
                    Title = "Bug 2",
                    Description = "Description 2",
                    Status = "Closed",
                    CreatedOn = DateTime.UtcNow,
                    Project = new Project
                    {
                        ProjectName = "Project B",
                        Description = "Sample project description" // required
                    }
                }
            };

            _bugRepositoryMock.Setup(repo => repo.GetAll())
                .Returns(bugs.Select(b => new Bug
                {
                    Id = b.Id,
                    Title = b.Title,
                    Description = b.Description,
                    Status = b.Status,
                    ProjectId = b.ProjectId
                }).ToList());

            // Act
            var result = _bugService.GetAllBugs();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.Equal("Bug 1", result[0].Title);
            // Assert.Equal("Project B", result[0].ProjectName);
        }

        public Bug GetBug()
        {
            return new Bug
            {
                Title = " Bugss",
                Description = "Bug Description",
                Status = "In Progress",
                ProjectId = 1,
                CreatedOn = DateTime.UtcNow
            };
        }

        [Fact]
        public void AddBug_ShouldAddBug()
        {
            // Arrange
            var bug = GetBug();
            _bugRepositoryMock.Setup(repo => repo.Add(It.IsAny<Bug>())).Verifiable();

            // Act
            _bugService.AddBug(new BugResquestDTO
            {
                Title = bug.Title,
                Description = bug.Description,
                Status = bug.Status,
                ProjectId = bug.ProjectId
            });

            // Assert
            _bugRepositoryMock.Verify(repo => repo.Add(It.IsAny<Bug>()), Times.Once);
        }

        [Fact]
        public void RemoveBug_ShouldRemoveBug()
        {
            // Arrange
            var bugId = 1;
            _bugRepositoryMock.Setup(repo => repo.Delete(bugId)).Verifiable();

            // Act
            _bugService.DeleteBug(bugId);

            // Assert
            _bugRepositoryMock.Verify(repo => repo.Delete(bugId), Times.Once);
        }

        [Fact]
        public void UpdateBug_ShouldUpdateBug()
        {
            // Arrange
            var bugId = 1;
            var bug = GetBug();
            _bugRepositoryMock.Setup(repo => repo.GetById(bugId)).Returns(bug);
            _bugRepositoryMock.Setup(repo => repo.Update(It.IsAny<Bug>())).Verifiable();

            // Act
            _bugService.UpdateBug(bugId, new BugResquestDTO
            {
                Title = bug.Title,
                Description = bug.Description,
                Status = bug.Status,
                ProjectId = bug.ProjectId
            });

            // Assert
            _bugRepositoryMock.Verify(repo => repo.Update(It.IsAny<Bug>()), Times.Once);
        }

        [Fact]
        public void GetBugById_ShouldReturnBugResponseDTO()
        {
            // Arrange
            var bugId = 1;
            var bug = GetBug();
            _bugRepositoryMock.Setup(repo => repo.GetById(bugId)).Returns(bug);

            // Act
            var result = _bugService.GetBugById(bugId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(bug.Title, result.Title);
            Assert.Equal(bug.Description, result.Description);
            Assert.Equal(bug.Status, result.Status);
        }
    }
}
