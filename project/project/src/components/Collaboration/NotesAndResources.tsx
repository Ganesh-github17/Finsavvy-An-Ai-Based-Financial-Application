import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tab,
  Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface Resource {
  id: number;
  filename: string;
  uploaded_at: string;
}

const NotesAndResources = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [notes, setNotes] = useState<Note[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNotes();
    fetchResources();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/collaboration/notes', {
        headers: {
          'user-id': localStorage.getItem('userId') || '',
        },
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/collaboration/resources', {
        headers: {
          'user-id': localStorage.getItem('userId') || '',
        },
      });
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await fetch('/api/collaboration/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': localStorage.getItem('userId') || '',
        },
        body: JSON.stringify({
          title: newNoteTitle,
          content: newNoteContent,
        }),
      });

      if (response.ok) {
        setNoteDialogOpen(false);
        setNewNoteTitle('');
        setNewNoteContent('');
        fetchNotes();
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleUploadResource = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', localStorage.getItem('userId') || '');

    try {
      const response = await fetch('/api/collaboration/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchResources();
      }
    } catch (error) {
      console.error('Error uploading resource:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchResources();
      return;
    }

    try {
      const response = await fetch(`/api/collaboration/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResources(data.results);
    } catch (error) {
      console.error('Error searching resources:', error);
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Notes & Resources
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Notes" />
          <Tab label="Resources" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">My Notes</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setNoteDialogOpen(true)}
            >
              Add Note
            </Button>
          </Box>

          <List>
            {notes.map((note) => (
              <ListItem
                key={note.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={note.title}
                  secondary={new Date(note.created_at).toLocaleDateString()}
                />
              </ListItem>
            ))}
          </List>
        </StyledPaper>
      )}

      {activeTab === 1 && (
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Resources</Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadIcon />}
            >
              Upload PDF
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={handleUploadResource}
              />
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Box>

          <List>
            {resources.map((resource) => (
              <ListItem
                key={resource.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={resource.filename}
                  secondary={new Date(resource.uploaded_at).toLocaleDateString()}
                />
              </ListItem>
            ))}
          </List>
        </StyledPaper>
      )}

      <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddNote} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default NotesAndResources;
